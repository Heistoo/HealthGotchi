import * as FileSystem from 'expo-file-system';
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_API_KEY_OPENAI });

const handleVision = async (base64, setFood, setFoodGroup, getUsuarioId) => {

    const groups = ["Frutas", "Legumes e Verduras", "Carnes e Ovos", "Cereais, tuberculos, paes e raizes", "Leguminosas", "Leites e Derivados", "Doces, guloseimas e salgadinhos"]

    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What food is in the image? Respond in this format {\"food\": \"food_name\", \"group\": \"food_group\"}, if don't have any food, write the value as null, if the food is a fast-food type classify it as Guloseima, knowing that the groups are: {" + groups.join(", ") + "}." },
                    { type: "image_url", image_url: { url: "data:image/jpeg;base64," + base64 } }
                ]
            }
        ],
        max_tokens: 300
    });
    console.log('Resposta: ', response.choices[0].message.content);

    let parsedResponse;

    // Checa se a resposta é uma string
    if (typeof response.choices[0].message.content === 'string') {
        // Parse em um objeto
        parsedResponse = JSON.parse(response.choices[0].message.content);
    } else {
        // Se a resposta já for um objeto, converte numa const e ela passa para food & group
        parsedResponse = response.choices[0].message.content;
    }

    const { food, group } = parsedResponse;

    if (food !== undefined && group !== undefined) {
        setFood(food);
        setFoodGroup(group);
        
        //Faz requisição para o backend, passando o id do usuário e o grupo de alimento e muda os status do pet
        try {
            
            const usuarioId = await getUsuarioId();

            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/edit_status_and_assign_points`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuarioId: parseInt(usuarioId), grupo: group})
            });
            
            //Apenas para testes
            // if (res.ok) {
            //     const data = await res.json();
            //     alert(data.message);
            // } else {
            //     const errorData = await res.json();
            //     alert(`Erro: ${errorData.error}`);
            // }
        } catch (error) {
            alert(`Erro na requisição: ${error.message}`);
        }
    }

    return parsedResponse;
};


const takePhoto = async (cameraRef,setPhotoUri, saveBase64) => {
    console.log("Foto tirada...");
    if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        const base64 = await FileSystem.readAsStringAsync(photo.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setPhotoUri(photo.uri);
        saveBase64(base64);
    }
};
module.exports = { handleVision, takePhoto};