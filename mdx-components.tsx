import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/callout";
import { Steps, Step } from "@/components/steps";
import { FlowDiagram } from "@/components/flow-diagram";
import { CodeBlock } from "@/components/codeblock";

const components: MDXComponents = {
  Callout,
  Steps,
  Step,
  FlowDiagram,
  pre: (props) => <CodeBlock {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
