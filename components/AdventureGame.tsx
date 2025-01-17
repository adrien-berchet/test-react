'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Choice {
  text: string;
  nextNode: string;
}

interface StoryNode {
  text: string;
  choices: Choice[];
  image?: {
    src: string;
    alt: string;
  };
}

interface StoryNodes {
  [key: string]: StoryNode;
}

const AdventureGame = () => {
  // Story data structure
  const storyNodes: StoryNodes = {
    start: {
      text: "Vous vous réveillez dans une forêt mystérieuse. L'air est chargé de brume, et vous entendez des sons étranges au loin. Devant vous, le chemin se divise en deux directions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla enim, interdum quis ipsum interdum, venenatis laoreet orci. Sed in nulla diam. Cras sollicitudin, massa sit amet luctus dictum, eros risus tincidunt nisl, vel aliquam sem purus at est. Curabitur sed tellus lacus. Fusce hendrerit faucibus neque vitae aliquet. Donec sed tortor eu elit ultricies lobortis eget eget nulla. Nulla non leo viverra, venenatis nisi a, commodo ex. Curabitur ornare lorem vitae eleifend accumsan. Donec ultrices libero mauris, non luctus elit ullamcorper eu. ",
      choices: [
        { text: "Prendre le chemin de gauche, qui s'enfonce dans la forêt", nextNode: "leftPath" },
        { text: "Prendre le chemin de droite, qui semble monter", nextNode: "rightPath" }
      ],
      image: {
        src: "/images/fort-boyard.jpg",
        alt: "Un ancien temple en pierre"
      }
    },
    leftPath: {
      text: "En vous aventurant plus profondément dans la forêt, vous tombez sur une ancienne structure en pierre. On dirait un temple. Vous remarquez une porte entrouverte et une fenêtre brisée.",
      choices: [
        { text: "Essayer d'entrer par la porte", nextNode: "temple" },
        { text: "Examiner la fenêtre brisée", nextNode: "window" },
        { text: "Retourner et prendre l'autre chemin", nextNode: "start" }
      ]
    },
    rightPath: {
      text: "Le chemin montant vous mène à une falaise surplombant toute la forêt. Vous repérez l'entrée d'une grotte à proximité et ce qui semble être un pont de corde au loin.",
      choices: [
        { text: "Explorer la grotte", nextNode: "cave" },
        { text: "Essayer d'atteindre le pont de corde", nextNode: "bridge" },
        { text: "Retourner au point de départ", nextNode: "start" }
      ]
    },
    temple: {
      text: "À l'intérieur du temple, vous trouvez un ancien autel avec un orbe lumineux. Les murs sont couverts de symboles mystérieux.",
      choices: [
        { text: "Toucher l'orbe lumineux", nextNode: "orbEnd" },
        { text: "Étudier les symboles", nextNode: "symbolsEnd" },
        { text: "Quitter le temple", nextNode: "leftPath" }
      ]
    },
    window: {
      text: "Par la fenêtre, vous voyez quelque chose briller dans l'obscurité. Cela pourrait être précieux... ou dangereux.",
      choices: [
        { text: "Grimper par la fenêtre", nextNode: "treasureEnd" },
        { text: "Jouer la sécurité et partir", nextNode: "leftPath" }
      ]
    },
    cave: {
      text: "La grotte est sombre mais vous voyez d'étranges cristaux émettant une faible lumière. Vous entendez de l'eau goutter quelque part plus profondément.",
      choices: [
        { text: "Suivre le son de l'eau", nextNode: "waterEnd" },
        { text: "Examiner les cristaux", nextNode: "crystalEnd" },
        { text: "Sortir de la grotte", nextNode: "rightPath" }
      ]
    },
    bridge: {
      text: "Le pont de corde oscille dans le vent. Il semble ancien mais pourrait encore être traversable. À travers la brume, vous distinguez à peine ce qui semble être une tour de l'autre côté.",
      choices: [
        { text: "Traverser le pont", nextNode: "towerEnd" },
        { text: "Faire demi-tour", nextNode: "rightPath" }
      ]
    },
    orbEnd: {
      text: "Lorsque vos doigts touchent l'orbe, vous sentez une vague de magie ancienne parcourir votre corps. Vous avez débloqué des pouvoirs mystiques ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    },
    symbolsEnd: {
      text: "Après des heures d'étude, vous déchiffrez les symboles et découvrez l'emplacement d'une bibliothèque magique cachée ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    },
    treasureEnd: {
      text: "Vous trouvez un ancien coffre au trésor rempli de pierres précieuses ! Votre aventure vous a rendu riche ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    },
    waterEnd: {
      text: "Vous découvrez un lac souterrain avec un bateau magique. Il vous emmène vers une cité sous-marine cachée ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    },
    crystalEnd: {
      text: "Les cristaux réagissent à votre présence et révèlent un portail vers une autre dimension ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    },
    towerEnd: {
      text: "Vous atteignez la mystérieuse tour et découvrez que c'est en réalité une porte vers une académie de magie ! Vous êtes invité à y étudier ! FIN",
      choices: [{ text: "Recommencer", nextNode: "start" }]
    }
  };

  const [currentNode, setCurrentNode] = useState('start');

  const handleChoice = (nextNode: string) => {
    setCurrentNode(nextNode);
  };

  return (
    <div className="w-full max-w-1xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Forêt des Mystères</h2>

        <div className="bg-slate-50 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700">{storyNodes[currentNode].text}</p>
        </div>

        {/* Image container */}
        {storyNodes[currentNode].image && (
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={storyNodes[currentNode].image.src}
              alt={storyNodes[currentNode].image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-3">
          {storyNodes[currentNode].choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.nextNode)}
              className="w-full p-3 text-left bg-white border border-gray-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdventureGame;
