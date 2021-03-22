{
    'use strict';

    /*document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
    });*/

    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');

        console.log('clickedElement: ' + clickedElement);
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);
        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }



    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorsListSelector = '.authors.list',
        optCloudClassCountAuthors = 4,
        optCloudClassPrefixAuthors = 'author-size-';


    function generateTitleLinks(customSelector = '') {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        let html = '';

        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* get the title from the title element */

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            console.log(linkHTML);
            /* insert link into titleList */
            html = html + linkHTML;

            console.log(html);
        }
        titleList.innerHTML = html;


        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    function calculateAuthorParams(authors) {

        const params = {
            max: 0,
            min: 999999
        };

        for (let author in authors) {

            params.max = Math.max(authors[author], params.max);

            params.min = Math.min(authors[author], params.min);

        }
        return params;

    }

    function calculateAuthorClass(count, params) {

        const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCountAuthors + 1);

        return optCloudClassPrefixAuthors + classNumber;
    }


    function calculateTagsParams(tags) {

        const params = {
            max: 0,
            min: 999999
        };


        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }

        return params;
    }


    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        console.log(optCloudClassPrefix + classNumber);
        return optCloudClassPrefix + classNumber;
    }




    function generateTags() {
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};


        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const titleList = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');

            console.log(articleTags);
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');

            console.log(articleTagsArray);
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + linkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;

                }

                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            titleList.innerHTML = html
            /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');
        const tagsParams = calculateTagsParams(allTags);

        console.log('tagsParams:', tagsParams)

        /* [NEW] create variable for all links HTML code */
        let allTagsHTML = '';


        /* [NEW] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {

            const tagLinkHTML = '<li><a  class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';

            allTagsHTML += tagLinkHTML;
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
    }

    generateTags();



    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for (let tagActive of tagsActive) {
            /* remove class active */
            tagActive.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagsLink = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let tagLink of tagsLink) {
            /* add class active */
            tagLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags() {
        /* find all links to tags */
        const links = document.querySelectorAll('.post-tags a');
        /* START LOOP: for each link */
        for (let link of links) {
            /* add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();

    function generateAuthors() {
        let allAuthors = {};

        const articles = document.querySelectorAll(optArticleSelector);

        for (let article of articles) {
            const titleList = article.querySelector(optArticleAuthorSelector);

            let html = '';

            const authorName = article.getAttribute('data-author');

            const linkHTML = '<a href="#author-' + authorName + '" class="post-author">' + authorName + '</a>';

            html = html + linkHTML;

            if (!allAuthors[authorName]) {
                allAuthors[authorName] = 1;
            } else {
                allAuthors[authorName]++;
            }

            titleList.innerHTML = html;
        }

        const authorList = document.querySelector(optAuthorsListSelector);
        const authorsParams = calculateAuthorsParams(allAuthors);

        let allAuthorsHTML = '';



        for (let authorName in allAuthors) {



          const authorLinkHTML = calculateAuthorClass(allAuthors[authorName], authorsParams);

          allAuthorsHTML += '<li><a href="#author-' + authorName + '" class="' + authorLinkHTML + '">' + authorName + '</a></li>';
            console.log(allAuthorsHTML);
        }

        authorList.innerHTML = allAuthorsHTML;


    }

    generateAuthors();


    function authorClickHandler(event) {

        event.preventDefault();

        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const author = href.replace('#author-', '');
        const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');
        const authorsLink = document.querySelectorAll('a[href="' + href + '"]');


        for (let authorActive of authorsActive) {
            authorActive.classList.remove('active');
        }

        for (let authorLink of authorsLink) {
            authorLink.classList.add('active');
        }

        generateTitleLinks('[data-author="' + author + '"]');

    }


    function addClickListenersToAuthors() {

        const links = document.querySelectorAll('.post-author a');

        for (let link of links) {
            link.addEventListener('click', authorClickHandler);
        }
    }

    addClickListenersToAuthors();
}
