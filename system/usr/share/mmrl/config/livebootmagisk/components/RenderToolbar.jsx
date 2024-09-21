import { Toolbar } from "@mmrl/ui";
import { useActivity } from "@mmrl/hooks";

const RenderToolbar = (options) => {
  const { context } = useActivity();

  return () => (
    <Toolbar modifier="noshadow">
      <Toolbar.Left>
        <Toolbar.BackButton onClick={context.popPage} />
      </Toolbar.Left>
      <Toolbar.Center>{options?.title}</Toolbar.Center>
    </Toolbar>
  );
};

export { RenderToolbar };
