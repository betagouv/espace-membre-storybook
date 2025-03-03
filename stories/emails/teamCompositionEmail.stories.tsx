import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    TeamCompositionEmail,
    TeamCompositionEmailTitle,
} from "@em/src/server/views/templates/emails/teamCompositionEmail/teamCompositionEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";

import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@em/docs/.storybook/email";

type ComponentType = typeof TeamCompositionEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/TeamCompositionEmail",
    component: TeamCompositionEmail,
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
    return <TeamCompositionEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    startup: {
        uuid: "",
        ghid: "agora",
        name: "Agora",
        pitch: "La startup de l'agora",
        incubator_id: "",
        contact: "",
        description: "La startup de l'agora description",
    },
    memberAccountLink: "https://espace-membre.incubateur.net/account/base-info",
    activeMembers: [
        {
            member: {
                uuid: "",
                username: "lucas.thenet",
                fullname: "Lucas Thenet",
                role: "Dev",
                missions: [
                    {
                        start: new Date(),
                    },
                ],
                domaine: Domaine.ANIMATION,
                primary_email_status: EmailStatusCode.EMAIL_ACTIVE,
            },
            activeMission: {
                start: new Date(),
                end: addMonths(new Date(), 8),
            },
        },
        {
            member: {
                uuid: "",
                username: "albert.toconel",
                fullname: "Albert Toconel",
                role: "Dev",
                missions: [
                    {
                        start: subMonths(new Date(), 8),
                    },
                ],
                domaine: Domaine.ANIMATION,
                primary_email_status: EmailStatusCode.EMAIL_ACTIVE,
            },
            activeMission: {
                start: subMonths(new Date(), 8),
                end: addMonths(new Date(), 8),
            },
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
    withEmailClientOverviewFactory(TeamCompositionEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
