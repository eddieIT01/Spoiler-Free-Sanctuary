// Multi-game guides structure for Spoiler-Free Sanctuary

const guides = [
  {
    slug: 'tlou',
    title: 'The Last of Us',
    accent: 'from-indigo-500 to-pink-500',
    sections: [
      { id: 1, chapterName: 'Prologue / Outskirts', isCompleted: false, tips: ['Move slowly and listen for audio cues.', 'Conserve ammo — melee is often safer early on.', 'Use cover to avoid direct firefights when possible.'], spoilers: ['First larger story beat after opening'], tasks: ['Complete the tutorial stealth sequence', 'Find 3 crafting materials in the area', 'Avoid major combat to conserve ammo'] },
      { id: 2, chapterName: 'Quarantine Zone', isCompleted: false, tips: ['Explore buildings for crafting materials.', 'Interact with NPCs to gather information and side details.', 'Watch for locked doors that can be opened later.'], spoilers: ['Important NPC development in the zone'], tasks: ['Talk to the vendor in the market', 'Search the pharmacy for supplies', 'Complete optional side interaction without dying'] },
      { id: 3, chapterName: 'The River / Suburbs', isCompleted: false, tips: ['Stealth paths often bypass difficult enemies.', 'Use bricks and bottles to distract and split groups.', 'Upgrade health and crafting when you have resources.'], spoilers: ['Major confrontation after the suburbs'], tasks: ['Scout the area for alternate routes', 'Collect materials for two medkits', 'Avoid alerting the patrol at the bridge'] }
    ]
  },
  {
    slug: 'hzd',
    title: 'Horizon Zero Dawn',
    accent: 'from-orange-500 to-rose-500',
    sections: [
      { id: 1, chapterName: 'Proving Grounds', isCompleted: false, tips: ['Learn the bow and traps early — ranged options are crucial.', 'Scan enemies often to learn weaknesses.', 'Use tall grass to stealth approach enemies.'], spoilers: ['First big machine encounter'], tasks: ['Complete the proving trial', 'Craft 3 different ammo types', 'Scan and mark 5 different machine types'] },
      { id: 2, chapterName: 'The Nora Lands', isCompleted: false, tips: ['Collect resources to craft ammo types.', 'Experiment with overrides to turn machines into allies.'], spoilers: ['Key tribe introduction'], tasks: ['Find the hidden cache in the ruins', 'Override a machine and bring it to camp'] }
    ]
  },
  {
    slug: 'gow',
    title: 'God of War',
    accent: 'from-cyan-400 to-indigo-600',
    sections: [
      { id: 1, chapterName: 'The Mountain', isCompleted: false, tips: ['Master the Leviathan axe throw / recall.', 'Use Atreus in combos to control crowds.', 'Explore for artifacts that power Kratos.'], spoilers: ['Major boss at mountain summit'], tasks: ['Upgrade the axe at the first blacksmith', 'Find 2 artifacts in hidden alcoves', 'Complete the mini-gauntlet without using health potions'] },
      { id: 2, chapterName: 'The Village', isCompleted: false, tips: ['Manage rage and cooldowns in longer fights.', 'Look for hidden paths with resources.'], spoilers: ['A major narrative reveal later in the village arc'], tasks: ['Investigate the old watchtower', 'Collect 100 XP from optional enemies'] }
    ]
  }
]

export default guides
