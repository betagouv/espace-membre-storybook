import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    EmailCreatedEmail,
    EmailCreatedEmailTitle,
} from "@em/src/server/views/templates/emails/EmailCreatedEmail/EmailCreatedEmail";
import { Meta, StoryFn } from "@storybook/react";
type ComponentType = typeof EmailCreatedEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/EmailCreatedEmail",
    component: EmailCreatedEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé au membre pour lui dire que son email beta.gouv.fr a été créé",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <EmailCreatedEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    email: "madeleine.durand@beta.gouv.fr",
    secondaryEmail: "madeleine.durant@gmail.com",
    secretariatUrl: "https://espace-membre.com",
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
    withEmailClientOverviewFactory(EmailCreatedEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
