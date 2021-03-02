<script>
    import {onMount} from 'svelte';
    import { getOnePersonalInfo } from '../../controllers/personalInfoController';
    import { getAllWorkHistoryByUserId } from '../../controllers/workHistoryController';
    import { getAllEducationBGByUserId } from '../../controllers/educationBGController';
    import { getAllCharacterRefByUserId } from '../../controllers/characterRefController';

    import {currentUser, currentUserPersonalInfo, currentUserWorkHistory, currentUserEBG, currentUserCharacterRef} from '../../util/store.js';


    const getInfo = async () => {
        currentUserPersonalInfo.set(await getOnePersonalInfo($currentUser.userId));
        currentUserWorkHistory.set(await getAllWorkHistoryByUserId($currentUser.userId));
        currentUserEBG.set(await getAllEducationBGByUserId($currentUser.userId));
        currentUserCharacterRef.set(await getAllCharacterRefByUserId($currentUser.userId));
    };

    onMount(async () => {
        await getInfo();
    });

</script>

<slot></slot>