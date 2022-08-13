export default function (){

        const randomNumber = Math.floor((Math.random() * 1234));
        return `${Date.now() + randomNumber}`

}