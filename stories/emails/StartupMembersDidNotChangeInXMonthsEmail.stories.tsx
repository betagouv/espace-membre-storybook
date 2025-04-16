import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import {
    StartupMembersDidNotChangeInXMonthsEmail,
    StartupMembersDidNotChangeInXMonthsEmailTitle,
} from "@em/src/server/views/templates/emails/startupMembersDidNotChangeInXMonthsEmail/startupMembersDidNotChangeInXMonthsEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
type ComponentType = typeof StartupMembersDidNotChangeInXMonthsEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/StartupMembersDidNotChangeInXMonthsEmail",
    component: StartupMembersDidNotChangeInXMonthsEmail,
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
    return <StartupMembersDidNotChangeInXMonthsEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    startupWrappers: [
        {
            startup: {
                uuid: "",
                ghid: "agora",
                name: "Agora",
                pitch: "Agora l'app des discussions",
                incubator_id: "",
                contact: "",
                description: "",
            },
            currentPhase: "Construction",
            activeMembers: 4,
            lastModification: subMonths(new Date(), 7),
        },
        {
            startup: {
                uuid: "",
                ghid: "datalma",
                name: "Datalma",
                pitch: "Appuyer les décisions prises par la Présidence, le Premier Ministre et les ministères sur des données pertinentes & récentes.",
                incubator_id: "",
                contact: "",
                description: "",
            },
            currentPhase: "Accélération",
            activeMembers: 2,
            lastModification: subMonths(new Date(), 2),
        },
        {
            startup: {
                uuid: "",
                ghid: "jagis",
                name: "J'agis",
                pitch: "Accompagner les citoyens de manière personnalisée dans la transition écologique",
                incubator_id: "",
                contact: "",
                description: "",
            },
            currentPhase: "Construction",
            activeMembers: 5,
            lastModification: subMonths(new Date(), 2),
        },
    ],
    incubator: {
        uuid: "",
        title: "Incubateur de service numérique de la Dinum",
        ghid: "",
        description: "",
        short_description: "",
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
    withEmailClientOverviewFactory(
        StartupMembersDidNotChangeInXMonthsEmailTitle()
    ),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
