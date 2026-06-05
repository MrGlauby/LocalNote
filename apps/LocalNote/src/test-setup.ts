import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
class TestModule {}

if (!(globalThis as any).__testbed_setup) {
  (globalThis as any).__testbed_setup = true;
  getTestBed().initTestEnvironment(
    [BrowserTestingModule, TestModule],
    platformBrowserTesting(),
    { teardown: { destroyAfterEach: true } },
  );
}
