export default function ({ store, redirect }) {
  // If the user is authenticated
  if (store.state.auth.user) {
    return redirect('/mypage')
  }
}
