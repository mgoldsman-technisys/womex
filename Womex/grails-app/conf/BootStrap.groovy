import womex.Article;


class BootStrap {

    def init = { servletContext ->
		new Article(id: 1, code: "SMB-201", description: "Article 1", dateCreated: new Date()).save()
		new Article(id: 2, code: "SMB-202", description: "Article 2", dateCreated: new Date()).save()
		new Article(id: 3, code: "SMB-203", description: "Article 3", dateCreated: new Date()).save()
		new Article(id: 4, code: "SMB-204", description: "Article 4", dateCreated: new Date()).save()
		new Article(id: 5, code: "SMB-205", description: "Article 5", dateCreated: new Date()).save()
		new Article(id: 6, code: "SMB-206", description: "Article 6", dateCreated: new Date()).save()
		new Article(id: 7, code: "SMB-207", description: "Article 7", dateCreated: new Date()).save()
		new Article(id: 8, code: "SMB-208", description: "Article 8", dateCreated: new Date()).save()
		new Article(id: 9, code: "SMB-209", description: "Article 9", dateCreated: new Date()).save()
		new Article(id: 10, code: "SMB-210", description: "Article 10", dateCreated: new Date()).save()
		new Article(id: 11, code: "SMB-211", description: "Article 11", dateCreated: new Date()).save()
		new Article(id: 12, code: "SMB-212", description: "Article 12", dateCreated: new Date()).save()
		new Article(id: 13, code: "SMB-213", description: "Article 13", dateCreated: new Date()).save()
		new Article(id: 14, code: "SMB-214", description: "Article 14", dateCreated: new Date()).save()
		new Article(id: 15, code: "SMB-215", description: "Article 15", dateCreated: new Date()).save()
		new Article(id: 16, code: "SMB-216", description: "Article 16", dateCreated: new Date()).save()
		new Article(id: 17, code: "SMB-217", description: "Article 17", dateCreated: new Date()).save()
		new Article(id: 18, code: "SMB-218", description: "Article 18", dateCreated: new Date()).save()
		new Article(id: 19, code: "SMB-219", description: "Article 19", dateCreated: new Date()).save()
		new Article(id: 20, code: "SMB-220", description: "Article 20", dateCreated: new Date()).save()
		
    }
    def destroy = {
    }
}
