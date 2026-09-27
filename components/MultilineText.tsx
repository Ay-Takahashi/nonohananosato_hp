import { Fragment } from 'react';

/**
 * 辞書内の "\n" を <br /> に変換して表示する。
 * 翻訳者が JSON を編集しやすいよう、改行は \n で持たせている。
 */
export default function MultilineText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
