import {
    NoMoreContractXDaysEmail,
    NoMoreContractXDaysEmailTitle,
  } from "@/server/views/templates/emails/NoMoreContractEmail/NoMoreContractXDaysEmail";
  import { StoryHelperFactory } from "@docs/.storybook/helpers";
  import { playFindEmailStructure } from "@docs/.storybook/testing";
  import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
  } from "@docs/.storybook/email";
  import { Meta, StoryFn } from "@storybook/react";
  import { subDays } from "date-fns";
import { CommunicationEmailCode, Domaine, EmailStatusCode } from "@em/src/models/member";
  
  type ComponentType = typeof NoMoreContractXDaysEmail;
  const { generateMetaDefault, prepareStory } = StoryHelperFactory<ComponentType>();
  
  export default {
    title: "Emails/Templates/NoMoreContractXDaysEmail",
    component: NoMoreContractXDaysEmail,
    ...generateMetaDefault({
      parameters: {
        ...commonEmailsParameters,
        docs: {
          description: {
            component:
              "Email envoyé à un membre dont la date de fin de mission est passée depuis 1 jour.",
          },
        },
      },
    }),
  } as Meta<ComponentType>;
  
  const Template: StoryFn<ComponentType> = (args) => {
    return <NoMoreContractXDaysEmail {...args} />;
  };
  
  const NormalStory = Template.bind({});
  NormalStory.args = {
    user: {
      fullname: "Madeleine Durand",
      missions: [
        {
          uuid: "mission-123",
          end: subDays(new Date(), 1),
          start: subDays(new Date(), 1),
        },
        {
          uuid: "mission-older",
          end: subDays(new Date(), 30),
          start: subDays(new Date(), 1),
        },
      ],
      uuid: "",
      username: "",
      role: "",
      domaine: Domaine.ANIMATION,
      secondary_email: "",
      communication_email: CommunicationEmailCode.PRIMARY,
      primary_email: null,
      primary_email_status: EmailStatusCode.EMAIL_ACTIVE,
      primary_email_status_updated_at: new Date(),
      updated_at: new Date()
    },
    days: 1,
  };
  NormalStory.decorators = [withEmailRenderer];
  NormalStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
  };
  
  export const Normal = prepareStory(NormalStory);
  
  const ClientOverviewStory = Template.bind({});
  ClientOverviewStory.args = {
    ...NormalStory.args,
  };
  ClientOverviewStory.decorators = [
    withEmailRenderer,
    withEmailClientOverviewFactory(NoMoreContractXDaysEmailTitle()),
  ];
  ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
  };
  
  export const ClientOverview = prepareStory(ClientOverviewStory);