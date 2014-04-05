(ns lt.plugins.photon
  (:require [lt.object :as object]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))

(cmd/command {:command :photon.add-folder
              :desc "photon: TODO"
              :exec (fn []
                      (prn "TODO"))})
