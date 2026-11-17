import { metaPixelId, pixelBootstrap, trackMeta } from "./metaPixel";

const PIXEL_ID = "123456789012345";

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_META_PIXEL_ID;
  delete window.fbq;
});

test("pixel is a no-op when NEXT_PUBLIC_META_PIXEL_ID is unset, blank, or not numeric", () => {
  const fbq = vi.fn();
  window.fbq = fbq;

  for (const value of [undefined, "", "   ", "not-an-id", "123abc", "abc123"]) {
    if (value === undefined) delete process.env.NEXT_PUBLIC_META_PIXEL_ID;
    else process.env.NEXT_PUBLIC_META_PIXEL_ID = value;
    expect(metaPixelId()).toBeNull();
    trackMeta("PageView");
    trackMeta("ViewContent");
    trackMeta("Contact");
  }

  expect(fbq).not.toHaveBeenCalled();
});

test("trackMeta forwards standard events when a numeric id is set", () => {
  process.env.NEXT_PUBLIC_META_PIXEL_ID = PIXEL_ID;
  const fbq = vi.fn();
  window.fbq = fbq;

  trackMeta("Contact");
  trackMeta("ViewContent");

  expect(metaPixelId()).toBe(PIXEL_ID);
  expect(fbq).toHaveBeenNthCalledWith(1, "track", "Contact");
  expect(fbq).toHaveBeenNthCalledWith(2, "track", "ViewContent");
});

test("bootstrap snippet inits the given id and sends PageView", () => {
  const snippet = pixelBootstrap(PIXEL_ID);
  expect(snippet).toContain(`fbq('init', '${PIXEL_ID}')`);
  expect(snippet).toContain("fbq('track', 'PageView')");
  expect(snippet).toContain("https://connect.facebook.net/en_US/fbevents.js");
  expect(snippet.match(/\d{5,}/g)).toEqual([PIXEL_ID]);
});

test("bootstrap refuses a non-numeric id", () => {
  expect(() => pixelBootstrap("123;alert(1)")).toThrow(/numeric/);
});
