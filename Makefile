DOCS_DIR ?=

ASTRO = DOCS_DIR="$(DOCS_DIR)" pnpm astro

.PHONY: dev stop status logs build preview clean

dev:
	$(ASTRO) dev --background

stop:
	$(ASTRO) dev stop

status:
	$(ASTRO) dev status

logs:
	$(ASTRO) dev logs --follow

build:
	$(ASTRO) build

preview:
	$(ASTRO) preview

clean:
	rm -rf dist .astro
