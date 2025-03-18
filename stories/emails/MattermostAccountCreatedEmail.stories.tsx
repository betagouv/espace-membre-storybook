import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@em/docs/.storybook/email";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    MattermostAccountCreatedEmail,
    MattermostAccountCreatedEmailTitle,
} from "@em/src/server/views/templates/emails/MattermostAccountCreatedEmail/MattermostAccountCreatedEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
type ComponentType = typeof MattermostAccountCreatedEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/MattermostAccountCreatedEmail",
    component: MattermostAccountCreatedEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé aux membres transverse de l'incubateur pour les informer qu'il y a une fiche à valider",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <MattermostAccountCreatedEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    email: "lucas.thenet@beta.gouv.fr",
    fullname: "Lucas Thenet",
    resetPasswordLink: "http://mattermost.incubateur.net/reset_password",
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
    withEmailClientOverviewFactory(MattermostAccountCreatedEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
