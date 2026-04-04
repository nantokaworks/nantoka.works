interface Props {
  onNavigate: (to: string) => void
}

export function Tokushoho({ onNavigate }: Props) {
  return (
    <div className="legal-page">
      <button className="back-link" onClick={() => onNavigate('/')}>
        &larr; トップに戻る
      </button>
      <h1 className="legal-title">特定商取引法に基づく表記</h1>
      <p className="legal-updated">最終更新: 2026年 4月 4日</p>
      <p className="legal-intro">
        本表記は、NANTOKAWORKS が運営する各種 Web サービスおよび Buy Me a Coffee を通じた支援受付に適用されます。
      </p>
      <table className="legal-table">
        <tbody>
          <tr>
            <th>事業者名</th>
            <td>NANTOKAWORKS</td>
          </tr>
          <tr>
            <th>運営責任者</th>
            <td>ICH</td>
          </tr>
          <tr>
            <th>所在地</th>
            <td>請求があった場合に遅滞なく開示いたします。</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>
              請求があった場合に遅滞なく開示いたします。お問い合わせはメールにてお願いいたします。
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>ichi0g0y@gmail.com</td>
          </tr>
          <tr>
            <th>販売価格</th>
            <td>
              各サービスの料金は該当サービスのページに表示しています。価格はすべて税込表示です。
              Buy Me a Coffee による支援は、支援者が任意の金額を選択できます。
            </td>
          </tr>
          <tr>
            <th>支払方法</th>
            <td>
              クレジットカード決済（Stripe 経由）、Buy Me a Coffee プラットフォーム経由の決済
            </td>
          </tr>
          <tr>
            <th>支払時期</th>
            <td>
              サブスクリプション型サービス: 登録時に初回決済が行われ、以降は契約更新日に自動決済されます。
              Buy Me a Coffee: 支援時に即時決済されます。
            </td>
          </tr>
          <tr>
            <th>サービス提供時期</th>
            <td>お支払い完了後、即時ご利用いただけます。</td>
          </tr>
          <tr>
            <th>解約・返金について</th>
            <td>
              サブスクリプション型サービス: 各サービスのマイページからいつでも解約できます。解約後も、現在の課金期間の終了日まではサービスをご利用いただけます。日割り返金は行っておりません。
              Buy Me a Coffee による支援: 任意の支援のため、返金には応じておりません。
            </td>
          </tr>
          <tr>
            <th>動作環境</th>
            <td>
              インターネット接続環境および対応ブラウザ（Google Chrome 推奨）
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
