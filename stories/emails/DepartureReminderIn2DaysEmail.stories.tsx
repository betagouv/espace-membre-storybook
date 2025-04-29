import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    DepartureReminderIn2DaysEmail,
    DepartureReminderIn2DaysEmailTitle,
} from "@em/src/server/views/templates/emails/DepartureReminderIn2DaysEmail/DepartureReminderIn2DaysEmail";
import { Meta, StoryFn } from "@storybook/react";

type ComponentType = typeof DepartureReminderIn2DaysEmail;
const { generateMetaDefault, prepareStory } = StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/DepartureReminderIn2DaysEmail",
    component: DepartureReminderIn2DaysEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component: "Email envoyé pour rappeler à un membre de mettre à jour sa date de fin de mission.",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <DepartureReminderIn2DaysEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    user: {
        fullname: "Madeleine Durand",
        uuid: "",
        username: "",
        role: "",
        missions: [],
        domaine: Domaine.ANIMATION,
        primary_email_status: EmailStatusCode.EMAIL_ACTIVE
    },
    endDate: new Date(),
    jobs: [
        {
            title: "Développeur.se fullstack",
            url: "https://www.example.com/job/1",
            id: "",
            published: "",
            domaines: [],
            updated: "",
            author: "",
            technos: "",
            content: ""
        },
        {
            title: "Product Owner",
            url: "https://www.example.com/job/2",
            id: "",
            published: "",
            domaines: [],
            updated: "",
            author: "",
            technos: "",
            content: ""
        },
    ],
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
    withEmailClientOverviewFactory(DepartureReminderIn2DaysEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);