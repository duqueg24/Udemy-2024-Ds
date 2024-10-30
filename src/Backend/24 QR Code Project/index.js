import inquirer from 'inquirer';
import qrCode from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        name: 'url',
        message: 'dev_diego_d'
    }
]).then((answers) => {
    const url = answers.url;
    
    // Generate QR code
    const qr_png = qrCode.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qr_code.png'));

    // Save URL to file
    fs.writeFile('url.txt', url, (err) => {
        if (err) throw err;
        console.log('URL saved to url.txt');
    });

    console.log('QR code generated and saved as qr_code.png');
});
