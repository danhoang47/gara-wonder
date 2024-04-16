import { GarageBasicInfo } from '@/api/garages/getBasicGarageInfo';
import { Helmet } from 'react-helmet';

export type MarkupProps = {
    garage?: GarageBasicInfo
}

function Markup({ garage }: MarkupProps) {
    const url = 'https://garagewonder.site/garages/' + garage?._id

    return (
        <Helmet>
            <title>{garage?.name}</title>
            <meta property='og:url' content={url} />
            <meta property='og:type' content="website" />
            <meta property='og:title' content={garage?.name} />
            <meta property='og:description' content="Sửa chữa xe của bạn với dịch vụ của chúng tôi" />
            <meta property='og:image' content={garage?.backgroundImage.url} />
        </Helmet>
    )
}

export default Markup;