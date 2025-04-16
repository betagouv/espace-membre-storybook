import {
    LoginEmail,
    LoginEmailTitle,
} from "@/server/views/templates/emails/LoginEmail/LoginEmail";
import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";

type ComponentType = typeof LoginEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/LoginEmail",
    component: LoginEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component: "Email de connexion à l'espace-membre",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <LoginEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    loginUrlWithToken: "https://espace-membre.incubateur.net/dummy-token",
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
    withEmailClientOverviewFactory(LoginEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
