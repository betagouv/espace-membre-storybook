import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    DepartureReminderInXDaysEmail,
    DepartureReminderInXDaysEmailTitle,
} from "@em/src/server/views/templates/emails/DepartureReminderInXDaysEmail/DepartureReminderInXDaysEmail";
import { Meta, StoryFn } from "@storybook/react";

type ComponentType = typeof DepartureReminderInXDaysEmail;
const { generateMetaDefault, prepareStory } = StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/DepartureReminderIn30DaysEmail",
    component: DepartureReminderInXDaysEmail,
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
    return <DepartureReminderInXDaysEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    user: {
        userInfos: {
            fullname: "Madeleine Durand",
            uuid: "",
            username: "",
            role: "",
            missions: [],
            domaine: Domaine.ANIMATION,
            primary_email_status: EmailStatusCode.EMAIL_ACTIVE
        },
        mattermostUsername: ""
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
    days: 30,
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
    withEmailClientOverviewFactory(DepartureReminderInXDaysEmailTitle({ days: 30 })),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);