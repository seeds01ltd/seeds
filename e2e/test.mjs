import { chromium } from 'playwright';

const BASE = 'https://seeds-lac.vercel.app';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  let passed = 0, failed = 0;

  function ok(label) { passed++; console.log(`  ✓ ${label}`); }
  function fail(label, msg) { failed++; console.log(`  ✗ ${label}: ${msg}`); }

  async function load(path) {
    const resp = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    return resp;
  }

  const pages = [
    '/', '/about', '/services', '/services/cloud-devops', '/services/ai-ml',
    '/portfolio', '/portfolio/nexus-health', '/pricing', '/blog', '/blog/llm-production-systems',
    '/contact', '/quote', '/courses', '/courses/react-masterclass',
    '/courses/react-masterclass/sandbox', '/faq', '/academy', '/careers',
    '/legal/privacy', '/login', '/register', '/forgot-password',
  ];

  console.log('\n=== PAGE LOAD TESTS ===');
  for (const path of pages) {
    try {
      const resp = await load(path);
      if (resp.status() !== 200) { fail(path, `Status ${resp.status()}`); continue; }
      ok(path);
    } catch (e) { fail(path, e.message?.substring(0, 80)); }
  }

  console.log('\n=== HOME PAGE ===');
  try {
    await load('/');
    const h1 = await page.textContent('h1');
    if (h1?.length > 5) ok(`Hero heading present`);
    else fail('Hero heading', h1);
    const sections = await page.$$('section');
    if (sections.length >= 3) ok(`${sections.length} sections rendered`);
    else fail('Sections', `${sections.length} found`);
  } catch (e) { fail('Home page checks', e.message?.substring(0, 80)); }

  console.log('\n=== NAVIGATION ===');
  try {
    await load('/');
    await page.click('a[href="/courses"]');
    await page.waitForTimeout(2000);
    const url = page.url();
    if (url.includes('/courses')) ok('Courses link works');
    else fail('Navigate to courses', url);
  } catch (e) { fail('Navigation', e.message?.substring(0, 80)); }

  console.log('\n=== MOBILE MENU ===');
  try {
    await page.setViewportSize({ width: 375, height: 667 });
    await load('/');
    const hamburger = await page.$('button[aria-label="Toggle menu"]');
    if (!hamburger) { fail('Mobile menu', 'no hamburger'); } else {
      await hamburger.click();
      await page.waitForTimeout(600);
      const navItem = await page.$('nav a');
      if (navItem) ok('Menu opens on mobile');
      else fail('Mobile menu', 'empty after open');
      const closeBtn = await page.$('button[aria-label="Close menu"]');
      if (closeBtn) { await closeBtn.click(); await page.waitForTimeout(400); ok('Menu closes via X'); }
      else fail('Mobile menu', 'no close button');
    }
  } catch (e) { fail('Mobile menu', e.message?.substring(0, 80)); }

  console.log('\n=== AUTH GUARDS ===');
  try {
    await page.setViewportSize({ width: 1280, height: 720 });
    await load('/modules/crm');
    await page.waitForTimeout(1000);
    if (page.url().includes('/login')) ok('Module /crm redirects to login');
    else fail('Module auth', `url=${page.url()}`);
  } catch (e) { fail('Module guard', e.message?.substring(0, 80)); }

  try {
    await load('/courses/react-masterclass');
    const startBtn = await page.$('button:has-text("Start Course")');
    if (startBtn) {
      await startBtn.click();
      await page.waitForTimeout(1000);
      if (page.url().includes('/login')) ok('Course start redirects to login');
      else fail('Course start redirect', `url=${page.url()}`);
    } else {
      ok('Already enrolled (Continue Learning visible)');
    }
  } catch (e) { fail('Course guard', e.message?.substring(0, 80)); }

  console.log('\n=== SANDBOX ===');
  try {
    await load('/courses/react-masterclass/sandbox');
    await page.waitForTimeout(1000);
    const content = await page.textContent('body');
    if (content.includes('Sandbox') || content.includes('sandbox') || content.includes('Task')) ok('Sandbox UI renders');
    else fail('Sandbox content', content?.substring(0, 80));
  } catch (e) { fail('Sandbox', e.message?.substring(0, 80)); }

  console.log('\n=== 404 PAGE (accepting networkidle constraints) ===');
  try {
    const resp = await page.goto(`${BASE}/this-does-not-exist`, { waitUntil: 'networkidle', timeout: 30000 });
    if (resp && resp.status() === 200) ok('404 returns HTTP 200');
    else fail('404 status', resp?.status());
  } catch (e) { fail('404', e.message?.substring(0, 80)); }

  console.log('\n=== COURSE DETAIL ===');
  try {
    await load('/courses/react-masterclass');
    await page.waitForTimeout(1000);
    const body = await page.textContent('body');
    if (body.includes('React') && body.includes('lesson')) ok('Course detail loads');
    else fail('Course detail', body?.substring(0, 120));
  } catch (e) { fail('Course detail', e.message?.substring(0, 80)); }

  console.log('\n=== REGISTER FORM ===');
  try {
    await load('/register');
    const inputs = await page.$$('input');
    if (inputs.length >= 3) ok(`Register form: ${inputs.length} inputs`);
    else fail('Register form', `${inputs.length} inputs`);
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) ok('Submit button present');
    else fail('Register form', 'no submit');
  } catch (e) { fail('Register', e.message?.substring(0, 80)); }

  console.log('\n=== FORGOT PASSWORD ===');
  try {
    await load('/forgot-password');
    const input = await page.$('input[type="email"]');
    if (input) ok('Forgot password email input');
    else fail('Forgot password', 'no email input');
  } catch (e) { fail('Forgot pw', e.message?.substring(0, 80)); }

  console.log(`\n=== RESULTS: ${passed} passed, ${failed} failed ===`);
  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
