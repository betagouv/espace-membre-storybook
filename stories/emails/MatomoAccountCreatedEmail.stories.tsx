import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@em/docs/.storybook/email";
import { MATOMO_SITE_TYPE } from "@em/src/models/actions/service";
import { Domaine, EmailStatusCode } from "@em/src/models/member";
import {
    MatomoAccountCreatedEmail,
    MatomoAccountCreatedEmailTitle,
} from "@em/src/server/views/templates/emails/MatomoAccountCreatedEmail/MatomoAccountCreatedEmail";
import { Meta, StoryFn } from "@storybook/react";
import { addMonths } from "date-fns/addMonths";
import { subMonths } from "date-fns/subMonths";
type ComponentType = typeof MatomoAccountCreatedEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/MatomoAccountCreated",
    component: MatomoAccountCreatedEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé au membre quand son compte matomo a été créé",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <MatomoAccountCreatedEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    fullname: "Madeleine Durand",
    matomoResetUrl: "https://stats.beta.gouv.fr/index.php?module=Login",
    email: "madeleine.durand@beta.gouv.fr",
    newSite: {
        type: MATOMO_SITE_TYPE.website,
        url: "https://aides-jeunes.beta.gouv.fr",
        startupId: "dade23dcnadsnr93dass",
    },
    sites: [
        {
            id: 119,
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
    withEmailClientOverviewFactory(MatomoAccountCreatedEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
