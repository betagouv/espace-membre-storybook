import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    StartupNewMemberArrivalEmail,
    StartupNewMemberArrivalEmailTitle,
} from "@em/src/server/views/templates/emails/StartupNewMemberArrivalEmail/StartupNewMemberArrivalEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
type ComponentType = typeof StartupNewMemberArrivalEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/StartupNewMemberArrivalEmail",
    component: StartupNewMemberArrivalEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé tous les 3 mois avec la liste des membres de la startus",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <StartupNewMemberArrivalEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    startup: {
        uuid: "",
        ghid: "agora",
        name: "Agora",
        incubator_id: "",
        start: undefined,
    },
    userInfos: {
        uuid: "",
        username: "lucas.thenet",
        fullname: "Lucas Thenet",
        role: "Développeur Fullstack    ",
        missions: [
            {
                start: new Date(),
            },
        ],
        domaine: Domaine.ANIMATION,
        primary_email_status: EmailStatusCode.EMAIL_ACTIVE,
    },
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
    withEmailClientOverviewFactory(StartupNewMemberArrivalEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
