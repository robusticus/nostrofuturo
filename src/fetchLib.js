// Utility routines that are common 
class FetchLib {

    // Utility for building a URL
    static BlobURL(file) {
        return "https://nostrofuturo.blob.core.windows.net/nostrofuturo/" 
            + file 
            + "?sv=2019-10-10&ss=b&srt=sco&sp=r&se=2021-06-08T00:14:16Z&st=2020-06-07T16:14:16Z&spr=https&sig=fi694WbXc%2BDnV7qqhyaZnkaJYHZo4%2BpBC37M0J5D6M8%3D&_=1591563533365"
            + "&version=1"
    }
}

export default FetchLib;