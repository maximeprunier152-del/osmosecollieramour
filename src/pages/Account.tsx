import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Mail, Calendar, LogOut, MapPin, Save } from "lucide-react";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useAuth();

  // Profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
    country: "France",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setEmail(user.email || "");
      fetchProfile();
    }
  }, [user, loading]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name, address_line1, address_line2, city, postal_code, country")
      .eq("id", user.id)
      .single();

    if (data && !error) {
      setProfileData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        address_line1: data.address_line1 || "",
        address_line2: data.address_line2 || "",
        city: data.city || "",
        postal_code: data.postal_code || "",
        country: data.country || "France",
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profileData.first_name || null,
        last_name: profileData.last_name || null,
        address_line1: profileData.address_line1 || null,
        address_line2: profileData.address_line2 || null,
        city: profileData.city || null,
        postal_code: profileData.postal_code || null,
        country: profileData.country || null,
      })
      .eq("id", user.id);

    setIsSaving(false);

    if (error) {
      toast.error("Erreur lors de la sauvegarde");
    } else {
      toast.success("Profil mis à jour !");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error("Erreur de connexion", { description: error.message });
      } else {
        toast.success("Connexion réussie !");
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Cet email est déjà utilisé");
        } else {
          toast.error("Erreur d'inscription", { description: error.message });
        }
      } else {
        toast.success("Compte créé avec succès !");
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {user ? (
            // Logged in view
            <div className="space-y-6">
              {/* Account Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">Mon Compte</h1>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Membre depuis</p>
                      <p className="font-medium">
                        {new Date(user.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>

              {/* Profile Personalization Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-6 w-6 text-primary" />
                  <h2 className="font-heading text-xl font-bold text-foreground">Personnaliser mon profil</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      placeholder="Votre prénom"
                      value={profileData.first_name || ""}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      placeholder="Votre nom"
                      value={profileData.last_name || ""}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="font-heading text-lg font-semibold text-foreground">Adresse</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address_line1">Adresse</Label>
                    <Input
                      id="address_line1"
                      placeholder="Numéro et nom de rue"
                      value={profileData.address_line1 || ""}
                      onChange={(e) => setProfileData({ ...profileData, address_line1: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address_line2">Complément d'adresse</Label>
                    <Input
                      id="address_line2"
                      placeholder="Appartement, bâtiment, etc. (optionnel)"
                      value={profileData.address_line2 || ""}
                      onChange={(e) => setProfileData({ ...profileData, address_line2: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Code postal</Label>
                      <Input
                        id="postal_code"
                        placeholder="75001"
                        value={profileData.postal_code || ""}
                        onChange={(e) => setProfileData({ ...profileData, postal_code: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        placeholder="Paris"
                        value={profileData.city || ""}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      placeholder="France"
                      value={profileData.country || ""}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </div>
            </div>
          ) : (
            // Login/Signup form
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="text-center">
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  {isLogin ? "Connexion" : "Créer un compte"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isLogin
                    ? "Connectez-vous à votre compte"
                    : "Inscrivez-vous pour profiter de nos offres"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                  {isLogin ? "Se connecter" : "S'inscrire"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : "Déjà un compte ? Se connecter"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
