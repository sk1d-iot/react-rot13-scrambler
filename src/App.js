import { useState } from 'react';


function CryptInput({doInput}) {
  return (
    <textarea placeholder="Input.." onChange={doInput} />
  );
}

function CryptOutput({text}) {
  function blockKeys(e) {
    return false;
  }
  return (
    <textarea placeholder="Output.." value={text} readonly/>
  );
}

export default function Rot13() {
  const [cyphertext, setCyphertext] = useState("");

  function encrypt(source) {
    const src = source;
    let output = "";

    for(let i = 0; i < src.length; i++) {
      let c = src.charCodeAt(i);

      if(c < 65 || (c > 90 && c < 97) || c > 122) {
        // non-alphabetic character. pass through.
      } else {
        if(c < 90) {
          // uppercase alpha
          c += 13;
          if(c > 90) {
            c = 65 + (c - 90) -1;
          }
        } else {
          // lowecase alpha
          c += 13;
          if(c > 122) {
            c = 97 + (c - 122) -1;
          }
        }
      }
      output += String.fromCharCode(c);
    }

    setCyphertext(output);
  }

  function handleInput(e) {
    const next = e.target.value;
    encrypt(next);
  }

  return (
    <div className="main">
      <h5>SkidCrypt rot13</h5>
      <CryptInput doInput={handleInput} />
      <CryptOutput text={cyphertext} />
    </div>
  );
}