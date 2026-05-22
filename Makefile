ARCHES := x86 arm
GIT_SHA := $(shell git -C ../services/mailflow rev-parse --short HEAD 2>/dev/null || echo dev)
export GIT_SHA
# overrides to s9pk.mk must precede the include statement
include s9pk.mk

# Build using official upstream images instead of local source
x86-upstream:
	USE_UPSTREAM=1 $(MAKE) x86

arm-upstream:
	USE_UPSTREAM=1 $(MAKE) arm

upstream: x86-upstream arm-upstream
