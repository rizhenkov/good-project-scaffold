/* Platform block — filled at init from the platform profile
   (apps/api/docs/Platform.md, «Линтер зависимостей»).
   PLATFORM_MODULES: SDKs and bindings of the runtime, allowed only in config and
   infrastructure. PLATFORM_BUILTINS: runtime built-ins that are not Node built-ins,
   declared so they resolve instead of tripping not-to-unresolvable. */
const PLATFORM_MODULES = [];
const PLATFORM_BUILTINS = [];

/* Where the generated ORM client lives (docs/Conventions/Layer-Boundaries.md,
   «Infrastructure») and the ORM's own packages. */
const ORM_GENERATED = '^src/infrastructure/db/generated/';
const ORM_PACKAGES = 'node_modules/@prisma/';

/* Unit tests and the shared fakes next to them (docs/Conventions/Testing.md). */
const TEST_FILES = '[.](test|test-support)[.]ts$';

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        /* Layer boundaries (docs/Conventions/Layer-Boundaries.md).
           Dependencies point inward only:
             presentation → application → domain
             infrastructure implements domain/application ports
             shared depends on nothing; config and the entry points
             (src/*.ts at the root) wire everything and are exempt.
             domain may use shared/utils only; shared/utils depend on nothing. */
        {
            name: 'domain-depends-on-nothing',
            severity: 'error',
            comment: 'Domain is the core and must not know any other layer.',
            from: { path: '^src/domain' },
            to: {
                path: '^src/(application|infrastructure|presentation|config)',
            },
        },
        {
            name: 'application-not-to-presentation',
            severity: 'error',
            comment:
                'Application is called by presentation, never the reverse.',
            from: { path: '^src/application' },
            to: { path: '^src/(presentation|config)' },
        },
        {
            name: 'application-not-to-infrastructure',
            severity: 'error',
            comment:
                'Application sees infrastructure only through ports. A type both sides need is declared next to the port (application/interfaces or domain) and infrastructure imports it from there.',
            from: { path: '^src/application' },
            to: { path: '^src/infrastructure' },
        },
        {
            name: 'infrastructure-to-application-interfaces-only',
            severity: 'error',
            comment:
                'Infrastructure implements ports; it must not call application services.',
            from: { path: '^src/infrastructure' },
            to: {
                path: '^src/application',
                pathNot: '^src/application/interfaces',
            },
        },
        {
            name: 'infrastructure-not-to-config',
            severity: 'error',
            comment:
                'Config is the composition root and knows everything; adapters take their own options type, which config builds from AppConfig.',
            from: { path: '^src/infrastructure' },
            to: { path: '^src/config' },
        },
        {
            name: 'infrastructure-not-to-presentation',
            severity: 'error',
            from: { path: '^src/infrastructure' },
            to: { path: '^src/presentation' },
        },
        {
            name: 'presentation-not-to-infrastructure',
            severity: 'error',
            comment: 'Routes talk to application services only.',
            from: { path: '^src/presentation' },
            to: { path: '^src/infrastructure' },
        },
        {
            name: 'shared-depends-on-nothing',
            severity: 'error',
            from: { path: '^src/shared' },
            to: {
                path: '^src/(domain|application|infrastructure|presentation|config)',
            },
        },
        {
            name: 'domain-to-shared-utils-only',
            severity: 'error',
            comment:
                'Domain may use pure helpers from shared/utils; the rest of shared (HTTP errors, base types) is not for the core.',
            from: { path: '^src/domain' },
            to: { path: '^src/shared', pathNot: '^src/shared/utils' },
        },
        {
            name: 'shared-utils-depend-on-nothing',
            severity: 'error',
            comment:
                'shared/utils are leaves: whatever imports them, the domain included, pulls in nothing else.',
            from: { path: '^src/shared/utils', pathNot: TEST_FILES },
            to: { pathNot: '^src/shared/utils' },
        },
        {
            name: 'orm-only-in-repositories-and-config',
            severity: 'error',
            comment:
                'The ORM and its generated client are imported only by repositories, infrastructure/db and the composition root.',
            from: {
                path: '^src',
                pathNot: [
                    '^src/infrastructure/(repositories|db)/',
                    '^src/config/',
                ],
            },
            to: { path: [ORM_GENERATED, ORM_PACKAGES] },
        },
        ...(PLATFORM_MODULES.length > 0
            ? [
                  {
                      name: 'platform-only-in-config-and-infrastructure',
                      severity: 'error',
                      comment:
                          'Platform SDKs and binding types stay in config and infrastructure; domain, application, presentation and shared are platform-neutral (Platform.md).',
                      from: {
                          path: '^src/(domain|application|presentation|shared)',
                      },
                      to: { path: PLATFORM_MODULES },
                  },
              ]
            : []),
        {
            name: 'no-circular',
            severity: 'error',
            from: {},
            to: { circular: true },
        },
        {
            name: 'not-to-test',
            severity: 'error',
            comment: 'Production code must not import tests or test fakes.',
            from: { pathNot: TEST_FILES },
            to: { path: TEST_FILES },
        },
        {
            name: 'not-to-dev-dep',
            severity: 'error',
            comment: 'Code that ships must not import devDependencies.',
            from: { path: '^src', pathNot: TEST_FILES },
            to: {
                dependencyTypes: ['npm-dev'],
                dependencyTypesNot: ['type-only'],
                pathNot: ['node_modules/@types/'],
            },
        },
        {
            name: 'not-to-unresolvable',
            severity: 'error',
            from: {},
            to: { couldNotResolve: true },
        },
    ],
    options: {
        /* The generated client is not analysed, but imports of it stay visible to
           orm-only-in-repositories-and-config. */
        doNotFollow: { path: ['node_modules', ORM_GENERATED] },
        builtInModules: { add: PLATFORM_BUILTINS },
        tsPreCompilationDeps: true,
        tsConfig: { fileName: 'tsconfig.json' },
        enhancedResolveOptions: {
            exportsFields: ['exports'],
            conditionNames: ['import', 'require', 'node', 'default', 'types'],
            mainFields: ['module', 'main', 'types', 'typings'],
        },
        skipAnalysisNotInRules: true,
        reporterOptions: { text: { highlightFocused: true } },
    },
};
