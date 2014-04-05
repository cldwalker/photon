(ns lt.plugins.photon
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.workspace :as workspace]
            [lt.plugins.photon.selector :as selector]
            [clojure.string :as s])
  (:require-macros [lt.macros :refer [behavior]]))

(def directories (atom []))

(def home (files/home))

(defn expand-path [path]
  (s/replace-first path #"^~/" home))

(defn ->items [path]
  (let [children (files/ls-sync path {:dirs true})]
    (map #(hash-map :name (files/basename %) :path (files/join path %))
         children)))

(defn add-items []
  (->> @directories
       (map expand-path)
       (mapcat ->items)
       ;; consider case-insensitive
       (sort-by :name)))

(def add-selector
  (selector/selector {:items add-items
                      :key :name
                      :transform #(str "<p>" %3 "</p><p class='binding'>" (:path %4) "</p>")}))

(cmd/command {:command :photon.add-folder
              :desc "photon: Select folder to add"
              :options add-selector
              :exec (fn [item]
                      (object/raise workspace/current-ws :add.folder! (:path item)))})

(def remove-selector
  (selector/selector {:items (fn []
                               (map
                                #(hash-map :path % :name (files/basename %))
                                (:folders @workspace/current-ws)))
                      :key :name
                      :transform #(str "<p>" %3 "</p><p class='binding'>" (:path %4) "</p>")}))

(cmd/command {:command :photon.remove-folder
              :desc "photon: Select folder to remove"
              :options remove-selector
              :exec (fn [item]
                      (object/raise workspace/current-ws :remove.folder! (:path item)))})

(comment
  (prn @directories)
  (->items (expand-path "~/code/fork"))
  (items)
  (reset! directories ["~/code/fork" "/Users/me/code/repo"]))
