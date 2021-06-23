import React from "react";
import Components from "../__Components__/Components";
import Grid from "../Grid/Grid";

type PageProps = {
  title: string;
  body?: any;
};

export const LandingPage = (props: { content: PageProps }) => {
  const { content } = props;
  const { body } = content;

  return (
    <main>
      {body && (
        <div>
          {body.map((block: any) => {
            const component = {
              component: block.sys.contentType.sys.id,
              uid: block.sys.id,
              ...block.fields,
            };
            return Components(component, block.fields);
          })}
        </div>
      )}
    </main>
  );
};
export default LandingPage;
