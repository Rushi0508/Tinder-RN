const getMatchedUserInfo = (users, userLoggedIn)=>{
    const newUsers = {...users}
    delete newUsers[userLoggedIn];

    const [id, user] = Object.entries(newUsers).flat();
    //@ts-ignore
    return {id, ...user};
}

export {getMatchedUserInfo}