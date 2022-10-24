export default {
    "passwords": {
        "create": [
            "user.email != null AND ",
            [
                "func.get(folders,document.folderId).owner == user.email OR",
                "func.get(userSharingSettings,user.email,sharedFolders,document.folderId).shared == true"
            ],
            "document.owner == user.email AND",
            "document.name != null AND",
            "func.size(document.name) > 0 AND",
            "func.size(document.name) < 50"
        ]
    }
}