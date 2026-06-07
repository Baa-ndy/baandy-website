import { Btn } from "@/components/ui/Btn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function Signup() {
  return (
    <section id="signup" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap-wide signup">
        <Reveal className="section-head" as="div">
          <div>
            <Eyebrow>the reciprocal ask</Eyebrow>
            <h2 className="display" style={{ margin: "14px 0 0" }}>
              there are two halves to every <em>swap</em>.
            </h2>
          </div>
          <p className="lede muted" style={{ maxWidth: "32ch" }}>
            You bring one. We help you find the other. Do both, and you&apos;ve turned your home
            into the world.
          </p>
        </Reveal>
        <Reveal className="cols" as="div">
          <div className="half">
            <span className="k">half one</span>
            <h3>open up your home</h3>
            <p>
              Photograph the place you live like you love it. It becomes your half of every
              future swap.
            </p>
            <Btn href="#signup" variant="primary">list your home</Btn>
          </div>
          <div className="half">
            <span className="k">half two</span>
            <h3>find your match</h3>
            <p>
              Tell us where you&apos;re dreaming of. We&apos;ll look for the person whose home —
              and dates — line up with yours.
            </p>
            <Btn href="#signup" variant="pink">find a swap</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
