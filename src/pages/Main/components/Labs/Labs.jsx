import BlockHeading from '../BlockHeading';
import { LabList } from '../../../../components';

import './Labs.styles.scss';

function Labs() {

    return (
        <div className="block" id="labs">
            <BlockHeading heading="Наши лаборатории" />
            <LabList />
        </div>
    );
}

export default Labs;