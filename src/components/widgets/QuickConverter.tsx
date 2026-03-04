"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

type ConverterMode = "volume" | "dilution" | "markup";

export default function QuickConverter() {
  const [mode, setMode] = useState<ConverterMode>("volume");
  const [inputVal, setInputVal] = useState("");

  const modes: { key: ConverterMode; label: string }[] = [
    { key: "volume", label: "Volume" },
    { key: "dilution", label: "Dilution" },
    { key: "markup", label: "Markup" },
  ];

  const mlToOz = (ml: number) => (ml / 29.5735).toFixed(2);
  const ozToMl = (oz: number) => (oz * 29.5735).toFixed(1);

  const renderVolume = () => {
    const val = parseFloat(inputVal) || 0;
    const commonSizes = [5, 10, 30, 50, 100];
    return (
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-mono text-gray-600 uppercase block mb-1">Enter mL</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 50"
            className="w-full bg-scent-bg/80 border border-scent-border rounded px-2 py-1.5 text-[12px] font-mono text-white placeholder:text-gray-700 focus:outline-none focus:border-scent-accent/50"
          />
        </div>
        {val > 0 && (
          <div className="bg-scent-bg/50 rounded p-2 border border-scent-border">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-gray-400">{val} mL =</span>
              <span className="text-[14px] font-mono font-bold text-scent-accent">{mlToOz(val)} fl oz</span>
            </div>
          </div>
        )}
        <div className="text-[10px] font-mono text-gray-600 uppercase mb-1">Common Sizes</div>
        <div className="grid grid-cols-5 gap-1.5">
          {commonSizes.map((size) => (
            <div key={size} className="bg-scent-bg/30 rounded p-1.5 border border-scent-border text-center">
              <div className="text-[11px] font-mono text-white">{size}mL</div>
              <div className="text-[9px] font-mono text-gray-500">{mlToOz(size)}oz</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDilution = () => {
    const concentrateML = parseFloat(inputVal) || 0;
    const dilutions = [
      { name: "Parfum", pct: 20 },
      { name: "EDP", pct: 15 },
      { name: "EDT", pct: 10 },
      { name: "EDC", pct: 5 },
      { name: "Splash", pct: 2 },
    ];
    return (
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-mono text-gray-600 uppercase block mb-1">Concentrate (mL)</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 10"
            className="w-full bg-scent-bg/80 border border-scent-border rounded px-2 py-1.5 text-[12px] font-mono text-white placeholder:text-gray-700 focus:outline-none focus:border-scent-accent/50"
          />
        </div>
        <div className="text-[10px] font-mono text-gray-600 uppercase">Total Batch Size</div>
        <div className="space-y-1.5">
          {dilutions.map((d) => {
            const total = concentrateML > 0 ? (concentrateML / (d.pct / 100)).toFixed(1) : "—";
            const alcohol = concentrateML > 0 ? ((concentrateML / (d.pct / 100)) - concentrateML).toFixed(1) : "—";
            return (
              <div key={d.name} className="flex items-center justify-between py-1 px-2 rounded bg-scent-bg/30 border border-scent-border">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-white">{d.name}</span>
                  <span className="text-[10px] text-gray-500">({d.pct}%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500">{alcohol}mL alcohol</span>
                  <span className="text-[12px] font-mono font-bold text-scent-accent">{total}mL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMarkup = () => {
    const cost = parseFloat(inputVal) || 0;
    const markups = [2, 3, 4, 5, 8, 10];
    return (
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-mono text-gray-600 uppercase block mb-1">Cost Price ($)</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 25"
            className="w-full bg-scent-bg/80 border border-scent-border rounded px-2 py-1.5 text-[12px] font-mono text-white placeholder:text-gray-700 focus:outline-none focus:border-scent-accent/50"
          />
        </div>
        <div className="text-[10px] font-mono text-gray-600 uppercase">Retail Price by Markup</div>
        <div className="grid grid-cols-3 gap-1.5">
          {markups.map((m) => {
            const retail = cost > 0 ? (cost * m).toFixed(0) : "—";
            const margin = cost > 0 ? (((cost * m - cost) / (cost * m)) * 100).toFixed(0) : "—";
            return (
              <div key={m} className="bg-scent-bg/30 rounded p-2 border border-scent-border text-center">
                <div className="text-[10px] text-gray-500 font-mono">{m}x</div>
                <div className="text-[13px] font-mono font-bold text-white">${retail}</div>
                <div className="text-[9px] text-emerald-400 font-mono">{margin}% margin</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <WidgetWrapper title="Quick Converter" info="Handy tools for perfumers: volume conversion (mL/oz), dilution calculator for concentrate ratios, and retail markup pricing.">
      <div className="flex gap-1 mb-3">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setInputVal(""); }}
            className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
              mode === m.key
                ? "bg-scent-accent/20 text-scent-accent border border-scent-accent/30"
                : "text-gray-500 hover:text-gray-300 border border-transparent"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {mode === "volume" && renderVolume()}
      {mode === "dilution" && renderDilution()}
      {mode === "markup" && renderMarkup()}
    </WidgetWrapper>
  );
}
