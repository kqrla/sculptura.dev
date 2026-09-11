// /productstudio
//
// explains the sculptura virtual studio: a 3d scene system creators use to
// photograph jewelry that only exists as geometry. deliberately written as an
// explainer page rather than a marketing page, because the most common
// misunderstanding is that this is image generation. it is not, and the copy
// leans hard on that distinction.

import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Hand,
  Gem,
  Camera,
  Play,
  Boxes,
  Sparkles,
  Layers,
  Lightbulb,
  Move3d,
} from "lucide-react";
import SiteFooter from "../components/home/SiteFooter";
import SeoTags from "../components/seo/SeoTags";

// the four-step narrative, kept as data so the layout stays a single map.
const studioSteps = [
  {
    number: "01",
    icon: Hand,
    title: "choose a hand",
    summary:
      "pick a hand model to work with. the hand is a configurable base model, not a photograph, so every parameter is adjustable.",
    parameters: [
      "hand or body presentation",
      "skin tone",
      "hand proportions",
      "hand width",
      "finger length",
      "finger thickness",
      "palm proportions",
      "nail shape",
      "nail length",
      "nail appearance",
      "body hair",
      "other supported surface characteristics",
    ],
    footnote:
      "the sliders modify the underlying hand model rather than generating a new hand image. save a configuration once and reuse it across all of your product photography.",
  },
  {
    number: "02",
    icon: Gem,
    title: "add your jewelry",
    summary:
      "your designs already exist as 3d objects inside sculptura. drop a ring onto the hand, place it on the right finger, then add another, then another.",
    parameters: [
      "move a piece",
      "resize within supported constraints",
      "change orientation",
      "reorder position in a stack",
      "remove a piece",
      "add additional pieces",
    ],
    footnote:
      "you can stack pieces from your own catalog or, where available, pieces from other creators. each piece stays its own object, so the result is a real 3d arrangement rather than a flattened composite.",
  },
  {
    number: "03",
    icon: Camera,
    title: "adjust the scene",
    summary:
      "with the hand and jewelry arranged, configure the photography environment the same way you would in a physical studio.",
    parameters: [
      "camera position",
      "camera angle",
      "focal framing",
      "hand pose",
      "lighting",
      "backdrop",
      "scene composition",
    ],
    footnote:
      "because the hand and the jewelry are both real geometry, you can view the same arrangement from a different angle without needing another photograph.",
  },
  {
    number: "04",
    icon: Play,
    title: "make the hand move",
    summary:
      "the hand supports pose and motion controls. sculptura changes the pose of the underlying model and keeps the jewelry attached to the correct geometry.",
    parameters: [
      "alternate product views",
      "movement previews",
      "short animations",
      "gifs",
      "different hand positions",
    ],
    footnote:
      "no new image is generated for each pose. the jewelry stays your actual modeled object throughout the entire process.",
  },
];

// what a creator no longer needs. framed as removals because that is the
// clearest way to communicate the value to someone running a small studio.
const thingsYouDoNotNeed = [
  "a physical hand model",
  "a camera",
  "a photography studio",
  "physical samples of every design",
  "a separate 3d rendering workflow",
];

const sceneGraph = `scene
├── hand model
│   ├── morphology parameters
│   ├── surface parameters
│   └── pose state
│
├── jewelry objects
│   ├── geometry
│   ├── transforms
│   └── attachment / placement state
│
├── camera
│   ├── position
│   ├── orientation
│   └── projection parameters
│
├── lighting
│   └── scene lighting parameters
│
└── environment
    ├── backdrop
    └── composition parameters`;

const technicalNotes = [
  {
    icon: Boxes,
    title: "parameterized base mesh",
    body:
      "the hand is a single parameterized mesh with morphological and surface controls. skin and surface characteristics are represented independently from the underlying topology, so appearance changes do not require a separate hand asset for every combination.",
  },
  {
    icon: Move3d,
    title: "attachment coordinate spaces",
    body:
      "when jewelry is placed onto the hand, its placement is associated with the relevant hand or finger coordinate space. that is what keeps a ring on the finger when the finger bends.",
  },
  {
    icon: Layers,
    title: "posing acts on the rig",
    body:
      "posing operates on the hand's deformation system rather than producing a new raster image. jewelry transforms propagate from the attachment reference frame.",
  },
  {
    icon: Lightbulb,
    title: "rendering is the last step",
    body:
      "the output is a rendered view of a configured scene. change the camera without rebuilding the image, change the pose without repainting the jewelry, change the arrangement without regenerating the hand.",
  },
];

export default function ProductStudio() {
  return (
    <div className="min-h-screen">
      <SeoTags
        title="virtual studio | sculptura"
        description="sculptura's virtual studio is a 3d scene system for jewelry product photography. configure a hand model, place your real modeled pieces, set the camera and lighting, and render."
        canonical="https://sculptura.annecrypted.com/productstudio"
        keywords="jewelry product photography, 3d jewelry rendering, virtual hand model, sculptura studio"
      />

      <div className="px-6 pt-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            back
          </Link>

          {/* intro */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 border border-border/60 rounded-full px-3 py-1 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              virtual studio
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight lowercase text-foreground mb-4">
              photograph jewelry you have not made yet
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              the virtual studio lets you photograph and present your designs
              without physically owning or photographing a model. think of it
              like a digital dollhouse for product photography. you start with a
              pre-existing 3d model of a hand and build the shot from there.
            </p>
          </div>

          {/* steps */}
          <div className="space-y-6 mb-16">
            {studioSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <section
                  key={step.number}
                  className="bg-card rounded-[20px] border border-border/50 shadow-paper p-6 md:p-8"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-11 h-11 rounded-2xl border border-border/60 flex items-center justify-center bg-muted/40">
                      <StepIcon className="w-5 h-5 text-foreground/80" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 mb-1">
                        step {step.number}
                      </span>
                      <h2 className="font-serif text-xl md:text-2xl font-light lowercase tracking-tight text-foreground">
                        {step.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-6 max-w-3xl">
                    {step.summary}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mb-6">
                    {step.parameters.map((parameter) => (
                      <li
                        key={parameter}
                        className="text-sm text-foreground/85 font-light tracking-wide flex items-start gap-2"
                      >
                        <span className="mt-[9px] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                        {parameter}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed border-l-2 border-border/60 pl-4 max-w-3xl">
                    {step.footnote}
                  </p>
                </section>
              );
            })}
          </div>

          {/* why this exists */}
          <section className="bg-card rounded-[20px] border border-border/50 shadow-paper p-6 md:p-8 mb-16">
            <h2 className="font-serif text-2xl font-light lowercase tracking-tight text-foreground mb-4">
              why this exists
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5 max-w-3xl">
              product photography is usually the most expensive part of
              launching a jewelry design, and it happens after the piece is
              already cast. the studio moves that step before manufacturing so a
              creator can list, test, and market a design that only exists as
              geometry. you do not need:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
              {thingsYouDoNotNeed.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground/85 font-light tracking-wide flex items-start gap-2"
                >
                  <span className="mt-[9px] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-3xl">
              you design the piece, put it on a configurable hand, arrange the
              scene, and create product photography from the same underlying
              digital objects.
            </p>
          </section>

          {/* technical implementation */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-light lowercase tracking-tight text-foreground mb-3">
              technical implementation
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
              the virtual studio is a 3d scene system, not an image generation
              feature. that single decision drives every part of the
              architecture below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {technicalNotes.map((note) => {
                const NoteIcon = note.icon;
                return (
                  <div
                    key={note.title}
                    className="bg-card rounded-[18px] border border-border/50 shadow-paper p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <NoteIcon className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-sm font-mono uppercase tracking-wider text-foreground/80">
                        {note.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {note.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-card rounded-[20px] border border-border/50 shadow-paper p-6 md:p-8">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground/70 mb-4">
                scene composition
              </h3>
              <pre className="text-xs md:text-sm font-mono text-foreground/80 leading-relaxed overflow-x-auto">
                {sceneGraph}
              </pre>
            </div>
          </section>

          {/* the distinction */}
          <section className="bg-muted/30 rounded-[20px] border border-border/50 p-6 md:p-8 mb-14">
            <h2 className="font-serif text-2xl font-light lowercase tracking-tight text-foreground mb-5">
              the important distinction
            </h2>
            <div className="space-y-5 max-w-3xl">
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 mb-2">
                  the studio does not ask
                </span>
                <p className="font-serif text-lg md:text-xl font-light italic text-muted-foreground leading-relaxed">
                  "what would this jewelry probably look like on a hand?"
                </p>
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 mb-2">
                  it asks
                </span>
                <p className="font-serif text-lg md:text-xl font-light italic text-foreground leading-relaxed">
                  "given this hand geometry, this jewelry geometry, this pose,
                  this camera, and this lighting setup, what does the scene
                  render as?"
                </p>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed pt-2">
                that distinction is what makes the studio useful for product
                photography. the object being photographed is your actual
                modeled jewelry rather than a generated imitation.
              </p>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/publish"
              className="inline-flex items-center gap-2 text-sm font-light tracking-wide px-5 py-2.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              publish an artifact
            </Link>
            <Link
              to="/creator-docs"
              className="inline-flex items-center gap-2 text-sm font-light tracking-wide px-5 py-2.5 rounded-full border border-border/60 text-foreground hover:bg-muted/40 transition-colors"
            >
              creator docs
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
