import { cleanup, render } from "@testing-library/react";
import MetaPixel from "./meta-pixel";
import MetaPixelPageViews from "@/components/MetaPixelPageViews";

// next/script renders nothing outside the Next.js runtime. Render the inline
// snippet so this test can see whether MetaPixel chose to load it.
vi.mock("next/script", () => ({
  default: function Script({
    id,
    children,
  }: {
    id?: string;
    children?: string;
  }) {
    return <script id={id} dangerouslySetInnerHTML={{ __html: String(children ?? "") }} />;
  },
}));

const PIXEL_ID = "123456789012345";

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_META_PIXEL_ID;
  delete window.fbq;
});

afterEach(() => {
  cleanup();
});

test("does not render the pixel script when the env var is unset", () => {
  const { container } = render(<MetaPixel />);
  expect(container.innerHTML).toBe("");
  expect(document.documentElement.innerHTML).not.toContain("connect.facebook.net");
  expect(document.documentElement.innerHTML).not.toContain("fbq");
  expect(document.documentElement.innerHTML).not.toContain(PIXEL_ID);
});

test("script includes the env id and PageView, and no other pixel id", () => {
  process.env.NEXT_PUBLIC_META_PIXEL_ID = PIXEL_ID;
  const { container } = render(<MetaPixel />);
  const html = container.innerHTML;
  expect(html).toContain(PIXEL_ID);
  expect(html).toContain("PageView");
  expect(html).toContain("connect.facebook.net");
  expect(html).not.toContain("999999999999999");
});

test("route tracker does not call fbq without an id or on the first render", () => {
  const fbq = vi.fn();
  window.fbq = fbq;

  const { unmount } = render(<MetaPixelPageViews />);
  expect(fbq).not.toHaveBeenCalled();
  unmount();

  process.env.NEXT_PUBLIC_META_PIXEL_ID = PIXEL_ID;
  render(<MetaPixelPageViews />);
  expect(fbq).not.toHaveBeenCalled();
});
