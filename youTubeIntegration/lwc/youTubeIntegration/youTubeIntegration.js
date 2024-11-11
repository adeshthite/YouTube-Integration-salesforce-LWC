import { LightningElement, track } from 'lwc';
import getYoutRecord from '@salesforce/apex/IntegrationInYoutube.getYoutRecord';

export default class YouTubeIntegration extends LightningElement {
    name;
    @track videos = [];

    handleChange(event) {
        this.name = event.target.value;
    }

    handleClick() {
        getYoutRecord({ searchQueray: this.name })
            .then(response => {
                
                let youtubeParseData = JSON.parse(response);

                if (youtubeParseData.items && youtubeParseData.items.length > 0) {
                    this.videos = youtubeParseData.items.slice(0, 5).map(item => {
                        return {
                            id: item.id.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                            publishTime: item.snippet.publishedAt,
                            thumbnailUrl: item.snippet.thumbnails.medium.url
                        };
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}