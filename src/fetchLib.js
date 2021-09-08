// Utility routines that are common 
class FetchLib {

    // Utility for building a URL
    static BlobURL(file) {
        return "https://nostrofuturo.blob.core.windows.net/nostrofuturo/" 
            + file 
            + "?sp=r&st=2021-09-08T15:21:46Z&se=2026-09-08T23:21:46Z&spr=https&sv=2020-08-04&sr=c&sig=3kl%2FSgIBl4rF5EJRrfpvNqQ6m4oq%2FXRU9%2FsbA33giHc%3D"
            + "&version=2"
    }
}

export default FetchLib;