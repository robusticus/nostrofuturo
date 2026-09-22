// Utility routines that are common 
class FetchLib {

    // Utility for building a URL
    static BlobURL(file) {
        return "https://nostrofuturo.blob.core.windows.net/nostrofuturo/" 
            + file 
            + "?sv=2026-02-06&ss=bfqt&srt=co&sp=r&se=2050-09-22T10:43:56Z&st=2026-09-22T02:28:56Z&spr=https&sig=brYP74wCdFFkH%2BN7wZwA9Z7asscEfrkhIGwckgs0ywE%3D"
            + "&version=3"
    }
}

export default FetchLib;