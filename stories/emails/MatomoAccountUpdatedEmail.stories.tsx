import { StoryHelperFactory } from "@docs/.storybook/helpers";
import { playFindEmailStructure } from "@docs/.storybook/testing";
import {
    commonEmailsParameters,
    withEmailClientOverviewFactory,
    withEmailRenderer,
} from "@docs/.storybook/email";
import { MATOMO_SITE_TYPE } from "@em/src/models/actions/service";
import {
    MatomoAccountUpdatedEmail,
    MatomoAccountUpdatedEmailTitle,
} from "@em/src/server/views/templates/emails/MatomoAccountUpdatedEmail/MatomoAccountUpdatedEmail";
import { Meta, StoryFn } from "@storybook/react";

type ComponentType = typeof MatomoAccountUpdatedEmail;
const { generateMetaDefault, prepareStory } =
    StoryHelperFactory<ComponentType>();

export default {
    title: "Emails/Templates/MatomoAccountUpdated",
    component: MatomoAccountUpdatedEmail,
    ...generateMetaDefault({
        parameters: {
            ...commonEmailsParameters,
            docs: {
                description: {
                    component:
                        "Email envoyé au membre quand son compte matomo a été maj",
                },
            },
        },
    }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    return <MatomoAccountUpdatedEmail {...args} />;
};

const NormalStory = Template.bind({});
NormalStory.args = {
    fullname: "Madeleine Durand",
    matomoUrl: "https://stats.beta.gouv.fr/index.php?module=Login",
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
    withEmailClientOverviewFactory(MatomoAccountUpdatedEmailTitle()),
];
ClientOverviewStory.play = async ({ canvasElement }) => {
    await playFindEmailStructure(canvasElement);
};

export const ClientOverview = prepareStory(ClientOverviewStory);
