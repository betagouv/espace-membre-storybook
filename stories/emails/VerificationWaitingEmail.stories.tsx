import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import {
    VerificationWaitingEmail,
    VerificationWaitingEmailTitle,
} from "@em/src/server/views/templates/emails/VerificationWaitingEmail/VerificationWaitingEmail";
import { Meta, StoryFn } from "@storybook/react";

type ComponentType = typeof VerificationWaitingEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/VerificationWaitingEmail",
    component: VerificationWaitingEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé au nouveau membre pour qu'il valide ses informattions",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <VerificationWaitingEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    fullname: "Lucas Thenet",
    secondaryEmail: "lucas.thenet@gmail.com",
    secretariatUrl: "https://espace-membre.incubateur.net",
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
    withEmailClientOverviewFactory(VerificationWaitingEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
