import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PagePost } from "../../components";
import { getLabByID } from "../../../api";

function Lab() {
    const [lab, setLab] = useState();

    const params = useParams();
    const labID = params.id;

    useEffect(() => {
        const loadData = async () => {
            const newLab = await getLabByID(labID);
            setLab(newLab);
            console.log('newLab', newLab);
        };
        loadData();
    }, [labID]);

    return (
        <>
            {lab && <PagePost post={lab} isLab={true} />}
        </>
    );
}

export default Lab;