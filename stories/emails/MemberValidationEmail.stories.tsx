import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    MemberValidationEmail,
    MemberValidationEmailTitle,
} from "@em/src/server/views/templates/emails/memberValidationEmail/memberValidationEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
type ComponentType = typeof MemberValidationEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/MemberValidationEmail",
    component: MemberValidationEmail,
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
    return <MemberValidationEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
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
    validationLink:
        "https://espace-membre.incubateur.net/community/lucas.thenet/validate",
    startups: [
        {
            uuid: "",
            ghid: "jagis",
            name: "J'agis",
            incubator_id: "",
            start: new Date(),
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
    withEmailClientOverviewFactory(MemberValidationEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
