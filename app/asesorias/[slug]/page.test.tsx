import AdvisoryPage from "./page";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  getRedirectStatusCodeFromError,
  getURLFromRedirectError,
} from "next/dist/client/components/redirect";

test("the sole service detail url permanently redirects and keeps the query string", async () => {
  let caught: unknown;
  try {
    await AdvisoryPage({
      params: Promise.resolve({ slug: "el-empleado-que-no-se-cansa" }),
      searchParams: Promise.resolve({ lang: "en", utm_source: "ig", fbclid: "abc" }),
    });
  } catch (error) {
    caught = error;
  }

  if (!isRedirectError(caught)) {
    throw new Error("expected a permanent redirect");
  }
  expect(getRedirectStatusCodeFromError(caught)).toBe(308);
  expect(getURLFromRedirectError(caught)).toBe("/asesorias?lang=en&utm_source=ig&fbclid=abc");
});
