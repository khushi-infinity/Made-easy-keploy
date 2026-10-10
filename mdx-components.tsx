import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/callout";
import { Steps, Step } from "@/components/steps";
import { FlowDiagram } from "@/components/flow-diagram";

const components: MDXComponents = {
  Callout,
  Steps,
  Step,
  FlowDiagram,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
