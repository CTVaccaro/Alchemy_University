async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = await create();
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "My First NFT",
            attributes: [
                {
                    "trait_type": "Peace",
                    "value": "10" 
                }
            ],
            // update the IPFS CID to be your image CID 
            image: "https://ipfs.io/ipfs/QmWPCh3qLhbn3yqR5nFCCYFKP37FapKeazfMc4Nff3foUJ",
            description: "So much PLW3!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();